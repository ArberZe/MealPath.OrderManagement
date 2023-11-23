using MealPath.OrderManagement.Application.Contracts.Orders;
using MealPath.OrderManagement.Orders.Models;
using Stripe;
using Stripe.Checkout;

namespace MealPath.OrderManagement.Orders.Services
{
    public class PaymentService
    {
        public PaymentService()
        {
            StripeConfiguration.ApiKey = "";
        }

        public Session CreateCheckoutSession(List<CartItem> cartItems)
        {
            var lineItems = new List<SessionLineItemOptions>();
            cartItems.ForEach(ci => lineItems.Add(new SessionLineItemOptions
            {
                PriceData = new SessionLineItemPriceDataOptions
                {
                    UnitAmountDecimal = ci.Price * 100,
                    Currency = "usd",
                    ProductData = new SessionLineItemPriceDataProductDataOptions
                    {
                        Name = ci.Title,
                        Images = new List<string> { ci.ImageUrl }
                    }
                },
                Quantity = ci.Quantity,
            }));
            var options = new SessionCreateOptions
            {
                LineItems = lineItems,
                Mode = "payment",
                SuccessUrl = "http://localhost:4242/success",
                CancelUrl = "http://localhost:4242/cancel",
            };

            var service = new SessionService();
            Session session = service.Create(options);
            return session;
        }
    }
}
