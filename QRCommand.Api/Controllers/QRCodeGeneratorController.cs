using System.Drawing;
using QRCommand.Api.Models;
using QRCommand.Api.Models.Payloads;
using Microsoft.AspNetCore.Mvc;
using QRCoder;
using System.Drawing.Imaging;
using System.IO;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using QRCommand.Api.Services;

namespace QRCommand.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class QRCodeGeneratorController : ControllerBase
{
    private readonly IQrCodeGeneratorService _qrCodeGeneratorService;

    public QRCodeGeneratorController(IQrCodeGeneratorService qrCodeGeneratorService)
    {
        _qrCodeGeneratorService = qrCodeGeneratorService;
    }

    // Methods for generating different types of payloads
    // Each method creates a specific payload and delegates the QR code generation
    // to the centralized method GenerateQrCodeFromPayload.

    /// <summary>
    /// Generates a QR code for a given text.
    /// </summary>
    /// <remarks>
    /// Sample request:
    /// 
    ///     POST /api/QrCode/create
    ///     {
    ///        "plainText": "Hello, World!",
    ///        "eccLevel": "Q",
    ///        "forceUtf8": false,
    ///        "utf8BOM": false,
    ///        "eciMode": "Default",
    ///        "requestedVersion": -1
    ///     }
    /// 
    /// This endpoint creates a QR code based on plain text input.
    /// </remarks>
    /// <param name="generatorRequest">The QR code generation request details.</param>
    /// <param name="renderType">The QR code output type</param>
    /// <returns>Returns a QR code image for the given text.</returns>
    /// <response code="200">Returns the QR code image</response>
    /// <response code="400">If the request is invalid</response>
    [HttpPost("create")]
    public async Task<IActionResult> CreateQrCode([FromBody] QRCodeGeneratorRequest generatorRequest,
        [FromQuery] RenderType renderType = RenderType.Base64) // Default to Base64
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        try
        {
            var qrCodeData = await _qrCodeGeneratorService.GenerateQrCodeAsync(generatorRequest.PlainText, renderType);
            return renderType == RenderType.Base64 ? Ok(qrCodeData) : Content(qrCodeData);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Internal server error: " + ex.Message);
        }
    }


    /// <summary>
    /// Generates a QR code for connecting to a WiFi network.
    /// </summary>
    /// <remarks>
    /// Sample request:
    /// 
    ///     POST /api/QrCode/create/wifi
    ///     {
    ///        "ssid": "MyWiFiNetwork",
    ///        "password": "MySecretPassword",
    ///        "isWPA": true
    ///     }
    /// 
    /// This endpoint creates a QR code that, when scanned, connects a device to the specified WiFi network.
    /// </remarks>
    /// <param name="request">The WiFi connection details.</param>
    /// <param name="renderType">The QR code output type</param>
    /// <returns>Returns a QR code image for WiFi connection.</returns>
    /// <response code="200">Returns the QR code image</response>
    /// <response code="400">If the request is invalid</response>
    [HttpPost("create/wifi")]
    public async Task<IActionResult> CreateWifiQrCode([FromBody] WiFiPayload request,
        [FromQuery] RenderType renderType = RenderType.Base64)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var payload = new PayloadGenerator.WiFi(request.Ssid, request.Password,
                request.IsWPA ? PayloadGenerator.WiFi.Authentication.WPA : PayloadGenerator.WiFi.Authentication.WEP)
            .ToString();
        try
        {
            var qrCodeData = await _qrCodeGeneratorService.GenerateQrCodeAsync(payload, renderType);
            return renderType == RenderType.Base64 ? Ok(qrCodeData) : Content(qrCodeData);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Internal server error: " + ex.Message);
        }
    }

    /// <summary>
    /// Generates a QR code for a URL.
    /// </summary>
    /// <remarks>
    /// Sample request:
    ///
    ///     POST /api/QrCode/create/url
    ///     {
    ///        "url": "https://www.example.com"
    ///     }
    ///
    /// This endpoint creates a QR code that, when scanned, directs to the specified URL.
    /// </remarks>
    /// <param name="request">The URL details.</param>
    ///     /// <param name="renderType">The QR code output type</param>
    /// <returns>Returns a QR code image for the URL.</returns>
    /// <response code="200">Returns the QR code image</response>
    /// <response code="400">If the request is invalid</response>
    [HttpPost("create/url")]
    public async Task<IActionResult> CreateUrlQrCode([FromBody] UrlPayload request,
        [FromQuery] RenderType renderType = RenderType.Base64)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        var payload = new PayloadGenerator.Url(request.Url).ToString();

        try
        {
            var qrCodeData = await _qrCodeGeneratorService.GenerateQrCodeAsync(payload, renderType);
            return renderType == RenderType.Base64 ? Ok(qrCodeData) : Content(qrCodeData);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Internal server error: " + ex.Message);
        }
    }

    /// <summary>
    /// Generates a QR code for an email message.
    /// </summary>
    /// <remarks>
    /// Sample request:
    ///
    ///     POST /api/QrCode/create/email
    ///     {
    ///        "email": "example@example.com",
    ///        "subject": "Hello",
    ///        "message": "This is a test email."
    ///     }
    ///
    /// This endpoint creates a QR code that, when scanned, prepares an email with the specified recipient, subject, and message.
    /// </remarks>
    /// <param name="request">The email details to encode.</param>
    /// <param name="renderType">The QR code output type</param>
    /// <returns>Returns a QR code image containing the email information.</returns>
    /// <response code="200">Returns the QR code image</response>
    /// <response code="400">If the request is invalid</response>
    [HttpPost("create/email")]
    public async Task<IActionResult> CreateEmailQrCode([FromBody] EmailPayload request,
        [FromQuery] RenderType renderType = RenderType.Base64)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        var payload = new PayloadGenerator.Mail(request.Email, request.Subject, request.Message).ToString();
        try
        {
            var qrCodeData = await _qrCodeGeneratorService.GenerateQrCodeAsync(payload, renderType);
            return renderType == RenderType.Base64 ? Ok(qrCodeData) : Content(qrCodeData);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Internal server error: " + ex.Message);
        }
    }

    /// <summary>
    /// Generates a QR code for an email message.
    /// </summary>
    /// <remarks>
    /// Sample request:
    ///
    ///     POST /api/QrCode/create/email
    ///     {
    ///        "email": "example@example.com",
    ///        "subject": "Hello",
    ///        "message": "This is a test email."
    ///     }
    ///
    /// This endpoint creates a QR code that, when scanned, prepares an email with the specified recipient, subject, and message.
    /// </remarks>
    /// <param name="renderType">The QR code output type</param>
    /// <param name="request">The email details to encode.</param>
    /// <returns>Returns a QR code image containing the email information.</returns>
    /// <response code="200">Returns the QR code image</response>
    /// <response code="400">If the request is invalid</response>
    [HttpPost("create/whatsapp")]
    public async Task<IActionResult> CreateWhatsAppQrCode([FromBody] WhatsAppMessagePayload request,
        [FromQuery] RenderType renderType = RenderType.Base64)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        var payload = new PayloadGenerator.WhatsAppMessage(request.PhoneNumber, request.Message).ToString();
        try
        {
            var qrCodeData = await _qrCodeGeneratorService.GenerateQrCodeAsync(payload, renderType);
            return renderType == RenderType.Base64 ? Ok(qrCodeData) : Content(qrCodeData);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Internal server error: " + ex.Message);
        }
    }

    /// <summary>
    /// Generates a QR code for a vCard.
    /// </summary>
    /// <remarks>
    /// Sample request:
    ///
    ///     POST /api/QrCode/create/vcard
    ///     {
    ///        "firstName": "John",
    ///        "lastName": "Doe"
    ///        // Additional vCard fields as needed
    ///     }
    ///
    /// This endpoint creates a QR code that, when scanned, imports the specified contact information into the device's address book.
    /// </remarks>
    /// <param name="renderType">The QR code output type</param>
    /// <param name="request">The vCard details.</param>
    /// <returns>Returns a QR code image containing the vCard information.</returns>
    /// <response code="200">Returns the QR code image</response>
    /// <response code="400">If the request is invalid</response>
    [HttpPost("create/vcard")]
    public async Task<IActionResult> CreateVCardQrCode([FromBody] VCardPayload request,
        [FromQuery] RenderType renderType = RenderType.Base64)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var generator = new PayloadGenerator.ContactData(PayloadGenerator.ContactData.ContactOutputType.VCard3,
            request.FirstName, request.LastName);
        // Add other vCard fields as needed
        var payload = generator.ToString();
        try
        {
            var qrCodeData = await _qrCodeGeneratorService.GenerateQrCodeAsync(payload, renderType);
            return renderType == RenderType.Base64 ? Ok(qrCodeData) : Content(qrCodeData);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Internal server error: " + ex.Message);
        }
    }

    /// <summary>
    /// Generates a QR code for sending an SMS.
    /// </summary>
    /// <remarks>
    /// Sample request:
    ///
    ///     POST /api/QrCode/create/sms
    ///     {
    ///        "phoneNumber": "+1234567890",
    ///        "message": "Hello, World!"
    ///     }
    ///
    /// This endpoint creates a QR code that, when scanned, prepares an SMS to the specified phone number with the given message.
    /// </remarks>
    /// <param name="renderType">The QR code output type</param>
    /// <param name="request">The SMS message details.</param>
    /// <returns>Returns a QR code image for sending an SMS.</returns>
    /// <response code="200">Returns the QR code image</response>
    /// <response code="400">If the request is invalid</response>
    [HttpPost("create/sms")]
    public async Task<IActionResult> CreateSmsQrCode([FromBody] SmsPayload request,
        [FromQuery] RenderType renderType = RenderType.Base64)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var payload = new PayloadGenerator.SMS(request.PhoneNumber, request.Message).ToString();
        try
        {
            var qrCodeData = await _qrCodeGeneratorService.GenerateQrCodeAsync(payload, renderType);
            return renderType == RenderType.Base64 ? Ok(qrCodeData) : Content(qrCodeData);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Internal server error: " + ex.Message);
        }
    }

    /// <summary>
    /// Generates a QR code for a calendar event.
    /// </summary>
    /// <remarks>
    /// Sample request:
    ///
    ///     POST /api/QrCode/create/calendar-event
    ///     {
    ///        "subject": "Team Meeting",
    ///        "description": "Discuss project updates",
    ///        "location": "Conference Room 1",
    ///        "start": "2024-03-02T09:00:00",
    ///        "end": "2024-03-02T10:00:00",
    ///        "allDayEvent": false,
    ///        "encoding": "Universal"
    ///     }
    ///
    /// This endpoint creates a QR code that, when scanned, adds a calendar event with the specified details.
    /// </remarks>
    /// <param name="renderType">The QR code output type</param>
    /// <param name="request">The calendar event details.</param>
    /// <returns>Returns a QR code image containing the calendar event information.</returns>
    /// <response code="200">Returns the QR code image</response>
    /// <response code="400">If the request is invalid</response>
    [HttpPost("create/calendar-event")]
    public async Task<IActionResult> CreateCalendarEventQrCode([FromBody] CalendarEventPayload request,
        [FromQuery] RenderType renderType = RenderType.Base64)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var generator = new PayloadGenerator.CalendarEvent(request.Subject, request.Description, request.Location,
            request.Start, request.End, request.AllDayEvent,
            request.Encoding == EventEncoding.ICalendar
                ? PayloadGenerator.CalendarEvent.EventEncoding.iCalComplete
                : PayloadGenerator.CalendarEvent.EventEncoding.Universal);
        var payload = generator.ToString();
        try
        {
            var qrCodeData = await _qrCodeGeneratorService.GenerateQrCodeAsync(payload, renderType);
            return renderType == RenderType.Base64 ? Ok(qrCodeData) : Content(qrCodeData);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Internal server error: " + ex.Message);
        }
    }

    /// <summary>
    /// Generates a QR code for a bookmark.
    /// </summary>
    /// <remarks>
    /// Sample request:
    ///
    ///     POST /api/QrCode/create/bookmark
    ///     {
    ///        "url": "https://www.example.com",
    ///        "title": "Example Website"
    ///     }
    ///
    /// This endpoint creates a QR code that, when scanned, saves a bookmark to the specified URL with the given title.
    /// </remarks>
    /// <param name="renderType">The QR code output type</param>
    /// <param name="request">The bookmark details.</param>
    /// <returns>Returns a QR code image for the bookmark.</returns>
    /// <response code="200">Returns the QR code image</response>
    /// <response code="400">If the request is invalid</response>
    [HttpPost("create/bookmark")]
    public async Task<IActionResult> CreateBookmarkQrCode([FromBody] BookmarkPayload request,
        [FromQuery] RenderType renderType = RenderType.Base64)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var payload = new PayloadGenerator.Bookmark(request.Url, request.Title).ToString();
        try
        {
            var qrCodeData = await _qrCodeGeneratorService.GenerateQrCodeAsync(payload, renderType);
            return renderType == RenderType.Base64 ? Ok(qrCodeData) : Content(qrCodeData);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Internal server error: " + ex.Message);
        }
    }

    /// <summary>
    /// Generates a QR code for a crypto currency payment address.
    /// </summary>
    /// <remarks>
    /// Sample request:
    ///
    ///     POST /api/QrCode/create/crypto-payment
    ///     {
    ///        "address": "1BoatSLRHtKNngkdXEeobR76b53LETtpyT",
    ///        "amount": 0.5,
    ///        "label": "Donation",
    ///        "message": "Thank you for your support!",
    ///        "currency": "Bitcoin"
    ///     }
    ///
    /// This endpoint creates a QR code that, when scanned, initiates a payment to the specified crypto currency address.
    /// </remarks>
    /// <param name="renderType">The QR code output type</param>
    /// <param name="request">The crypto currency payment details.</param>
    /// <returns>Returns a QR code image for the crypto currency payment.</returns>
    /// <response code="200">Returns the QR code image</response>
    /// <response code="400">If the request is invalid</response>
    [HttpPost("create/crypto-payment")]
    public async Task<IActionResult> CreateCryptoPaymentQrCode([FromBody] CryptoCurrencyPaymentPayload request,
        [FromQuery] RenderType renderType = RenderType.Base64)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        string payload = request.Currency switch
        {
            CryptoCurrency.Bitcoin => new PayloadGenerator.BitcoinAddress(request.Address, request.Amount,
                request.Label, request.Message).ToString(),
            CryptoCurrency.BitcoinCash => new PayloadGenerator.BitcoinCashAddress(request.Address, request.Amount,
                request.Label, request.Message).ToString(),
            CryptoCurrency.Litecoin => new PayloadGenerator.LitecoinAddress(request.Address, request.Amount,
                request.Label, request.Message).ToString(),
            _ => throw new ArgumentException("Unsupported currency type.")
        };

        try
        {
            var qrCodeData = await _qrCodeGeneratorService.GenerateQrCodeAsync(payload, renderType);
            return renderType == RenderType.Base64 ? Ok(qrCodeData) : Content(qrCodeData);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Internal server error: " + ex.Message);
        }
    }

    /// <summary>
    /// Generates a QR code for a geolocation.
    /// </summary>
    /// <remarks>
    /// Sample request:
    ///
    ///     POST /api/QrCode/create/geolocation
    ///     {
    ///        "latitude": "51.5074",
    ///        "longitude": "0.1278",
    ///        "encoding": "GEO"
    ///     }
    ///
    /// This endpoint creates a QR code that, when scanned, shows a location on the map.
    /// </remarks>
    /// <param name="renderType">The QR code output type</param>
    /// <param name="request">The geolocation details.</param>
    /// <returns>Returns a QR code image for the geolocation.</returns>
    /// <response code="200">Returns the QR code image</response>
    /// <response code="400">If the request is invalid</response>
    [HttpPost("create/geolocation")]
    public async Task<IActionResult> CreateGeolocationQrCode([FromBody] GeolocationPayload request,
        [FromQuery] RenderType renderType = RenderType.Base64)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var payload = request.Encoding switch
        {
            GeolocationEncoding.GEO => new PayloadGenerator.Geolocation(request.Latitude, request.Longitude,
                PayloadGenerator.Geolocation.GeolocationEncoding.GEO).ToString(),
            GeolocationEncoding.GoogleMaps => new PayloadGenerator.Geolocation(request.Latitude, request.Longitude,
                PayloadGenerator.Geolocation.GeolocationEncoding.GoogleMaps).ToString(),
            _ => throw new ArgumentException("Unsupported encoding type.")
        };

        try
        {
            var qrCodeData = await _qrCodeGeneratorService.GenerateQrCodeAsync(payload, renderType);
            return renderType == RenderType.Base64 ? Ok(qrCodeData) : Content(qrCodeData);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Internal server error: " + ex.Message);
        }
    }

    /// <summary>
    /// Generates a QR code for a girocode (SEPA payment).
    /// </summary>
    /// <remarks>
    /// Sample request:
    ///
    ///     POST /api/QrCode/create/girocode
    ///     {
    ///        "iban": "DE89370400440532013000",
    ///        "bic": "COBADEFFXXX",
    ///        "name": "John Doe",
    ///        "amount": 100.00,
    ///        "remittanceInformation": "Invoice 12345",
    ///        "typeOfRemittance": "Unstructured",
    ///        "purposeOfCreditTransfer": "Consulting Services",
    ///        "messageToGirocodeUser": "Thank you for your business",
    ///        "version": "Version1",
    ///        "encoding": "ISO_8859_1"
    ///     }
    ///
    /// This endpoint creates a QR code for a SEPA payment with the specified details.
    /// </remarks>
    /// <param name="renderType">The QR code output type</param>
    /// <param name="request">The girocode payment details.</param>
    /// <returns>Returns a QR code image for the SEPA payment.</returns>
    /// <response code="200">Returns the QR code image</response>
    /// <response code="400">If the request is invalid</response>
    [HttpPost("create/girocode")]
    public async Task<IActionResult> CreateGirocodeQrCode([FromBody] GirocodePayload request,
        [FromQuery] RenderType renderType = RenderType.Base64)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var generator = new PayloadGenerator.Girocode(
            request.Iban,
            request.Bic,
            request.Name,
            request.Amount,
            request.RemittanceInformation,
            request.TypeOfRemittance == TypeOfRemittance.Structured
                ? PayloadGenerator.Girocode.TypeOfRemittance.Structured
                : PayloadGenerator.Girocode.TypeOfRemittance.Unstructured,
            request.PurposeOfCreditTransfer,
            request.MessageToGirocodeUser,
            request.Version == GirocodeVersion.Version1
                ? PayloadGenerator.Girocode.GirocodeVersion.Version1
                : PayloadGenerator.Girocode.GirocodeVersion.Version2,
            request.Encoding == GirocodeEncoding.ISO_8859_1
                ? PayloadGenerator.Girocode.GirocodeEncoding.ISO_8859_1
                : PayloadGenerator.Girocode.GirocodeEncoding.UTF_8
        );
        var payload = generator.ToString();
        try
        {
            var qrCodeData = await _qrCodeGeneratorService.GenerateQrCodeAsync(payload, renderType);
            return renderType == RenderType.Base64 ? Ok(qrCodeData) : Content(qrCodeData);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Internal server error: " + ex.Message);
        }
    }
}