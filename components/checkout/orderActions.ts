
import { createClient } from "@/app/utils/supabase/client";

// Checkout information from CheckoutForm.tsx
export interface CheckoutDetails {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  country: string;
  postcode: string;
  phone: string;
  deliveryMethod: string;
  paymentMethod: string;
  giftWrap: boolean;
}

interface CartRow {
  product_id: string;
  variant: string;
  quantity: number;
}

interface ProductVariant {
  label: string;
  price: number;
}

interface ProductRecord {
  id: string;
  productName: string;
  price: number | null;
  quantity: number | null;
  variants: ProductVariant[] | null;
}

interface OrderLine {
  product_id: string;
  quantity: number;
  variant: string | null;
  unit_price: number;
}

// Result returned after placing an order
export interface PlaceOrderResult {
  orderId: string;
  total: number;
  subtotal: number;
  deliveryCost: number;
}

export async function placeOrder(
  details: CheckoutDetails
): Promise<PlaceOrderResult> {

  const supabase = createClient();

  // ----------------------------------
  // 1. Get authenticated customer
  // ----------------------------------

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) {
    throw new Error(authError.message);
  }

  if (!user) {
    throw new Error("Please log in before placing an order.");
  }

  // ----------------------------------
  // 2. Validate checkout information
  // ----------------------------------

  const requiredFields = [
    details.email,
    details.firstName,
    details.lastName,
    details.address,
    details.city,
    details.country,
    details.postcode,
    details.phone,
  ];

  if (requiredFields.some((value) => !value.trim())) {
    throw new Error("Please complete all required checkout fields.");
  }

  
if (!["cod", "card_on_delivery"].includes(details.paymentMethod)) {
  throw new Error("Invalid payment method.");
}

  // ----------------------------------
  // 3. Retrieve customer's cart
  // ----------------------------------

  const { data: cartData, error: cartError } = await supabase
    .from("cart")
    .select("product_id, variant, quantity")
    .eq("user_id", user.id);

  if (cartError) {
    throw new Error(cartError.message);
  }

  const cartRows = (cartData ?? []) as CartRow[];

  if (cartRows.length === 0) {
    throw new Error("Your cart is empty.");
  }

  // ----------------------------------
  // 4. Retrieve actual product details
  // ----------------------------------

  const productIds = [
    ...new Set(cartRows.map((item) => item.product_id)),
  ];

  const { data: productData, error: productError } = await supabase
    .from("product")
    .select('id, "productName", price, quantity, variants')
    .in("id", productIds);

  if (productError) {
    throw new Error(productError.message);
  }

  const products = (productData ?? []) as ProductRecord[];

  const productMap = new Map(
    products.map((product) => [product.id, product])
  );

  // ----------------------------------
  // 5. Calculate order subtotal
  // ----------------------------------

  let subtotal = 0;

  const orderLines: OrderLine[] = [];

  const requestedQuantities = new Map<string, number>();

  for (const item of cartRows) {

    const product = productMap.get(item.product_id);

    if (!product) {
      throw new Error("A product in your cart is no longer available.");
    }

    if (!Number.isInteger(item.quantity) || item.quantity < 1) {
      throw new Error("Invalid product quantity.");
    }

    // Add quantities of different variants
    // because product.quantity is shared by the product.

    requestedQuantities.set(
      item.product_id,
      (requestedQuantities.get(item.product_id) ?? 0) +
        item.quantity
    );

    // Find selected variant
    const variants = Array.isArray(product.variants)
      ? product.variants
      : [];

    const selectedVariant = item.variant
      ? variants.find((v) => v.label === item.variant)
      : undefined;

    if (item.variant && !selectedVariant) {
      throw new Error(
        `${product.productName}: selected variant is unavailable.`
      );
    }

    // Use variant price or base product price
    const unitPrice = Number(
      selectedVariant?.price ?? product.price
    );

    if (!Number.isFinite(unitPrice) || unitPrice < 0) {
      throw new Error(`Invalid price for ${product.productName}.`);
    }

    subtotal += unitPrice * item.quantity;

    orderLines.push({
      product_id: item.product_id,
      quantity: item.quantity,
      variant: item.variant || null,
      unit_price: unitPrice,
    });
  }

  // ----------------------------------
  // 6. Check available stock
  // ----------------------------------

  for (const [productId, requestedQty] of requestedQuantities) {

    const product = productMap.get(productId);

    if (!product) continue;

    if (
      product.quantity !== null &&
      product.quantity < requestedQty
    ) {
      throw new Error(
        `Insufficient stock for ${product.productName}.`
      );
    }
  }

  // ----------------------------------
  // 7. Calculate delivery cost
  // ----------------------------------

  const deliveryPrices: Record<string, number> = {
    standard: 0,
    express: 25,
    "white-glove": 95,
  };

  const deliveryCost = deliveryPrices[details.deliveryMethod];

  if (deliveryCost === undefined) {
    throw new Error("Invalid delivery method.");
  }

  const total = Number(
    (subtotal + deliveryCost).toFixed(2)
  );

  // ----------------------------------
  // 8. Update public.users
  // ----------------------------------

  const profileData = {
    fname: details.firstName.trim(),
    lname: details.lastName.trim(),
    email: details.email.trim(),
    address: details.address.trim(),
    contactno: details.phone.trim(),
  };

  const { data: existingProfile, error: profileError } =
    await supabase
      .from("users")
      .update(profileData)
      .eq("user_id", user.id)
      .select("user_id")
      .maybeSingle();

  if (profileError) {
    throw new Error(profileError.message);
  }

  // Create a basic profile if one does not exist.
  // The database policy restricts this to role = 'user'.

  if (!existingProfile) {

    const { error: createProfileError } = await supabase
      .from("users")
      .insert({
        user_id: user.id,
        role: "user",
        ...profileData,
      });

    if (createProfileError) {
      throw new Error(createProfileError.message);
    }
  }

  // ----------------------------------
  // 9. Insert main order into orders
  // ----------------------------------

  const { data: orderData, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: user.id,
      total: total,
      status: "pending",

      // Only new checkout-specific fields
      delivery_method: details.deliveryMethod,
      delivery_cost: deliveryCost,
      apartment: details.apartment.trim() || null,
      city: details.city.trim(),
      country: details.country,
      postcode: details.postcode.trim(),
      payment_method: details.paymentMethod,
      gift_wrap: details.giftWrap,
    })
    .select("order_id")
    .single();

  if (orderError || !orderData) {
    throw new Error(
      orderError?.message ?? "Could not create your order."
    );
  }

  const orderId: string = orderData.order_id;

  // ----------------------------------
  // 10. Insert products into order_product
  // ----------------------------------

  const orderProducts = orderLines.map((item) => ({
    order_id: orderId,
    product_id: item.product_id,
    quantity: item.quantity,
    variant: item.variant,
    unit_price: item.unit_price,
  }));

  const { error: itemsError } = await supabase
    .from("order_product")
    .insert(orderProducts);

  // ----------------------------------
  // 11. Clean up if item insertion fails
  // ----------------------------------

  if (itemsError) {

    const { error: cleanupError } = await supabase
      .from("orders")
      .delete()
      .eq("order_id", orderId)
      .eq("user_id", user.id);

    if (cleanupError) {
      console.error("Order cleanup failed:", cleanupError);

      throw new Error(
        `Order ${orderId} was created, but its products could not be saved. Please contact support with this order reference.`
      );
    }

    throw new Error(itemsError.message);
  }

  // The database trigger now:
  // 1. Reduces product stock.
  // 2. Clears the customer's cart.

  return {
    orderId,
    total,
    subtotal,
    deliveryCost,
  };
}
