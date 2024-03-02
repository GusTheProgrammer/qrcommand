namespace QRCommand.Api.Models.Payloads;

/// <summary>
/// Represents the payload for generating a vCard QR code.
/// </summary>
public class VCardPayload
{
    /// <summary>
    /// The first name of the contact.
    /// </summary>
    public string FirstName { get; set; }

    /// <summary>
    /// The last name of the contact.
    /// </summary>
    public string LastName { get; set; }

    /// <summary>
    /// The phone number of the contact.
    /// </summary>
    public string PhoneNumber { get; set; }

    /// <summary>
    /// The email address of the contact.
    /// </summary>
    public string Email { get; set; }
}
