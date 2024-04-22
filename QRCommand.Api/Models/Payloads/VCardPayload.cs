namespace QRCommand.Api.Models.Payloads
{
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
        /// The nickname or display name of the contact.
        /// </summary>
        public string Nickname { get; set; }

        /// <summary>
        /// The phone number of the contact.
        /// </summary>
        public string Phone { get; set; }

        /// <summary>
        /// The mobile phone number of the contact.
        /// </summary>
        public string MobilePhone { get; set; }

        /// <summary>
        /// The work phone number of the contact.
        /// </summary>
        public string WorkPhone { get; set; }

        /// <summary>
        /// The email address of the contact.
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// The birthday of the contact.
        /// </summary>
        public DateTime? Birthday { get; set; }

        /// <summary>
        /// The website or homepage of the contact.
        /// </summary>
        public string Website { get; set; }

        /// <summary>
        /// The street address of the contact.
        /// </summary>
        public string Street { get; set; }

        /// <summary>
        /// The house number of the contact's address.
        /// </summary>
        public string HouseNumber { get; set; }

        /// <summary>
        /// The city of the contact's address.
        /// </summary>
        public string City { get; set; }

        /// <summary>
        /// The ZIP code of the contact's address.
        /// </summary>
        public string ZipCode { get; set; }

        /// <summary>
        /// The country of the contact's address.
        /// </summary>
        public string Country { get; set; }

        /// <summary>
        /// Additional notes or memo text for the contact.
        /// </summary>
        public string Note { get; set; }

        /// <summary>
        /// The state or region of the contact's address.
        /// </summary>
        public string StateRegion { get; set; }

    }
}