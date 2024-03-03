
namespace MealPath.OrderManagement.Domain.Entities
{
    public class Application
    {
        public int Id { get; set; }
        public bool isActive { get; set; }
        public int ApplicantId { get; set; }
        public string Date { get; set;}
    }
}
