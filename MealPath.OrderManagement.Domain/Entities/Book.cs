using System.ComponentModel.DataAnnotations.Schema;

namespace MealPath.OrderManagement.Domain.Entities
{
    public class Book
    {
        public int BookId { get; set; }
        public string Title { get; set; }
        public int PublicationYear { get; set; }

        public int AuthorId { get; set; }
    }
}
