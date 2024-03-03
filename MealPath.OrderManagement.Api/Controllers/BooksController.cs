using Amazon.Runtime;
using MealPath.OrderManagement.Application.Contracts.Persistence;
using MealPath.OrderManagement.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MealPath.OrderManagement.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly IAsyncRepository<Book> _booksRepository;
        private readonly IAsyncRepository<Author> _authorsRepository;

        public BooksController(IAsyncRepository<Book> booksRepository, IAsyncRepository<Author> authorsRepository)
        {
            _booksRepository = booksRepository;
            _authorsRepository = authorsRepository;
        }

        [HttpGet("all", Name = "GetAllBooks")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<List<Book>>> GetAllBooks()
        {
            var dtos = await _booksRepository.ListAllAsync();
            return Ok(dtos);
        }

        [HttpGet("year", Name = "GetBooksByYear")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<List<Book>>> GetAllBooksByYear(int year)
        {
            var books = (IEnumerable<Book>)(await _booksRepository.ListAllAsync());

            var filteredBooks = books.Where(x=>x.PublicationYear == year);

            if (!filteredBooks.Any()) return NotFound();

            return Ok(filteredBooks);
        }

        [HttpGet("author", Name = "GetBooksByAuthorName")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<List<Book>>> GetAllBooksByAuthorName(string name)
        {
            var books = (IEnumerable<Book>)(await _booksRepository.ListAllAsync());
            var authors = (IEnumerable<Author>)(await _authorsRepository.ListAllAsync());

            var author = authors.FirstOrDefault(x => x.Name == name);

            if(author == null) return NotFound();

            var filteredBooks = books.Where(x => x.AuthorId == author.AuthorId);

            return Ok(filteredBooks);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult> Create(CreateBookVm model)
        {
            var book = new Book
            {
                Title = model.Title,
                PublicationYear = model.PublicationYear,
                AuthorId = model.AuthorId,
            };

            await _booksRepository.AddAsync(book);

            return Ok(book);
        }
    }

    public class CreateBookVm
    {
        public string Title { get; set; }
        public int PublicationYear { get; set; }
        public int AuthorId { get; set; }
    }
}
