namespace QRCommand.Api.Models.Payloads;

/// <summary>
/// Represents the payload for generating a bookmark QR code.
/// </summary>
public class BookmarkPayload
{
    /// <summary>
    /// The URL of the bookmark.
    /// </summary>
    public string Url { get; set; }

    /// <summary>
    /// The title of the bookmark.
    /// </summary>
    public string Title { get; set; }
}
