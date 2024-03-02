namespace QRCommand.Api.Models;

using System.ComponentModel.DataAnnotations;

public class ValidRequestedVersionAttribute : ValidationAttribute
{
    protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    {
        int requestedVersion = (int)value;

        if (requestedVersion == -1 || (requestedVersion >= 1 && requestedVersion <= 40))
        {
            return ValidationResult.Success;
        }
        else
        {
            return new ValidationResult("RequestedVersion must be either -1 or between 1 and 40.");
        }
    }
}
