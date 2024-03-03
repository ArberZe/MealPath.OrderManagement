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
            StripeConfiguration.ApiKey = "sk_test_51OFGaEFKTvOYuneAS7DFE6l8ozsTYCtUIPMVS1wIdOjG1RNQIeoorIJFkDPyAxYYQFzVvIbXHJl7kZRD2YUbl6YU003SJAixEV";
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
                SuccessUrl = "http://localhost:3000/success",
                CancelUrl = "http://localhost:3000/cancelled",
            };

            var service = new SessionService();
            Session session = service.Create(options);
            return session;
        }
    }
}
