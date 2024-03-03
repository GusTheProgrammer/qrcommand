using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using QRCommand.Api.Dtos;
using QRCommand.Api.Models;
using QRCommand.Api.Services;

/// <summary>
/// Handles CRUD operations for QR codes.
/// </summary>
[Authorize]
[Route("api/[controller]")]
[ApiController]
public class QRCodesController : ControllerBase
{
    private readonly IQrCodeService _qrCodeService;
    private readonly UserManager<IdentityUser> _userManager;

    public QRCodesController(IQrCodeService qrCodeService, UserManager<IdentityUser> userManager)
    {
        _qrCodeService = qrCodeService;
        _userManager = userManager;
    }


    /// <summary>
    /// Creates a new QR code.
    /// </summary>
    /// <param name="qrCodesDto">The QR code data.</param>
    /// <returns>The created QR code.</returns>
    /// <response code="201">Returns the newly created QR code</response>
    /// <response code="401">If the user is not authenticated</response>
    // POST: api/QRCodes
    [HttpPost]
    public async Task<IActionResult> CreateQRCode([FromBody] QrCodesDto qrCodesDto)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null) return Unauthorized("User is not recognized.");

        var createdQrCode = await _qrCodeService.CreateQrCodeAsync(user.Id, qrCodesDto);
        return CreatedAtAction(nameof(GetQRCode), new { id = createdQrCode.Id }, createdQrCode);
    }

    /// <summary>
    /// Retrieves a QR code by ID. Public QR codes are accessible without authentication.
    /// </summary>
    /// <param name="id">The ID of the QR code.</param>
    /// <returns>The requested QR code if found.</returns>
    /// <response code="200">Returns the requested QR code</response>
    /// <response code="404">If the QR code is not found or not accessible</response>
    // GET: api/QRCodes/5
    [HttpGet("{id}")]
    public async Task<ActionResult<QrCodesResponseDto>> GetQRCode(Guid id)
    {
        var qrCodeDto = await _qrCodeService.GetQrCodeAsync(id);
        if (qrCodeDto == null)
        {
            return NotFound();
        }

        if (!qrCodeDto.IsPublic)
        {
            var user = await _userManager.GetUserAsync(User);
            // If the user is not authenticated or does not own the QR code, return NotFound or Unauthorized
            if (user == null || qrCodeDto.UserId != user.Id)
            {
                return NotFound();
            }
        }

        return qrCodeDto;
    }

    /// <summary>
    /// Retrieves all QR codes for the authenticated user.
    /// </summary>
    /// <returns>A list of QR codes owned by the user.</returns>
    /// <response code="200">Returns the list of QR codes</response>
    /// <response code="401">If the user is not authenticated</response>
    // GET: api/QRCodes
    [HttpGet]
    public async Task<ActionResult<IEnumerable<QrCodesResponseDto>>> GetAllQRCodes()
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return Unauthorized("User is not recognized.");
        }

        var qrCodesDto = await _qrCodeService.GetAllQrCodesForUserAsync(user.Id);
        return Ok(qrCodesDto);
    }

    /// <summary>
    /// Updates an existing QR code.
    /// </summary>
    /// <param name="id">The ID of the QR code to update.</param>
    /// <param name="qrCodesDto">The updated QR code data.</param>
    /// <returns>A status indicating the result of the update operation.</returns>
    /// <response code="204">If the QR code was successfully updated</response>
    /// <response code="401">If the user is not authenticated</response>
    /// <response code="404">If the QR code is not found or not owned by the user</response>
    // PUT: api/QRCodes/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateQRCode(Guid id, [FromBody] QrCodesDto qrCodesDto)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null) return Unauthorized();

        var success = await _qrCodeService.UpdateQrCodeAsync(id, user.Id, qrCodesDto);
        if (!success) return NotFound();

        return NoContent();
    }

    /// <summary>
    /// Deletes a QR code.
    /// </summary>
    /// <param name="id">The ID of the QR code to delete.</param>
    /// <returns>A status indicating the result of the delete operation.</returns>
    /// <response code="204">If the QR code was successfully deleted</response>
    /// <response code="401">If the user is not authenticated</response>
    /// <response code="404">If the QR code is not found or not owned by the user</response>
    // DELETE: api/QRCodes/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteQRCode(Guid id)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null) return Unauthorized();

        var success = await _qrCodeService.DeleteQrCodeAsync(id, user.Id);
        if (!success) return NotFound();

        return NoContent();
    }
}