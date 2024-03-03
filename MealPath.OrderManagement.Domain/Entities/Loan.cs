namespace MealPath.OrderManagement.Domain.Entities
{
    public class Loan
    {
        public int LoanId { get; set; }
        public double Amount { get; set; }
        public Status Status { get; set; }
        public bool IsDeleted { get; set; }
        public int CustomerId { get; set; }
    }

    public enum Status
    {
        Accepted,
        Cancelled,
        Pending
    }
}
