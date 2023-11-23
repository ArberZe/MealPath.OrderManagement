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
            StripeConfiguration.ApiKey = "sk_test_51OFezCJHvpKuai9IXZyY2jty7I0SRQz18z0hBrv0MYsfZgl2UdOFtB0bJEojxTE1p0Uq2BZZ40hjJ7IyPnr38j6R007ZIsublE";
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
