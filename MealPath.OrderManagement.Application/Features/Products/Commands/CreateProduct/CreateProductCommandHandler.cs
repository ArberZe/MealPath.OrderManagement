using AutoMapper;
using MealPath.OrderManagement.Application.Contracts.Infrastructure;
using MealPath.OrderManagement.Application.Contracts.Persistence;
using MealPath.OrderManagement.Application.Models.Mail;
using MealPath.OrderManagement.Domain.Entities;
using MediatR;

namespace MealPath.OrderManagement.Application.Features.Products.Commands.CreateProduct
{
    public class CreateProductCommandHandler : IRequestHandler<CreateProductCommand, CreateProductCommandResponse>
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;
        //private readonly IEmailService _emailService;

        public CreateProductCommandHandler
            (IMapper mapper, IProductRepository productRepository/*, IEmailService emailService*/)
        {
            _mapper = mapper;
            _productRepository = productRepository;
            //_emailService = emailService;
        }

        public async Task<CreateProductCommandResponse> Handle(CreateProductCommand request,
            CancellationToken cancellationToken)
        {
            var createProductCommandResponse = new CreateProductCommandResponse();

            var validator = new CreateProductCommandValidator();
            var validationResult = await validator.ValidateAsync(request);

            if (validationResult.Errors.Count > 0)
            {
                createProductCommandResponse.Success = false;
                createProductCommandResponse.ValidationErrors = new List<string>();
                foreach (var error in validationResult.Errors)
                {
                    createProductCommandResponse.ValidationErrors.Add(error.ErrorMessage);
                }
            }

            if (createProductCommandResponse.Success)
            {
                var product = new Product()
                {
                    Title = request.Title, Description = request.Description, CategoryId = request.CategoryId,
                    ImageUrl = request.ImageUrl, Price = request.Price
                };
                product = await _productRepository.AddAsync(product);
                createProductCommandResponse.Product = _mapper.Map<CreateProductDto>(product);
                //var email = new Email() {To = "erionismajli50@gmail.com", Body = $"A new product was created: {request}",
                //    Subject = "A new product was created"};

                try
                {
                    //await _emailService.SendEmail(email);
                }
                catch (Exception e)
                {
                    //this shouldn't stop the API from doing else so this can be logged
                }
            }

            return createProductCommandResponse;
        }
    }
}
