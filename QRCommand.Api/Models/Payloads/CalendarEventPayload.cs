namespace QRCommand.Api.Models.Payloads;

public enum EventEncoding
{
    Universal,
    ICalendar
}

/// <summary>
/// Represents the payload for generating a calendar event QR code.
/// </summary>
public class CalendarEventPayload
{
    /// <summary>
    /// The subject or title of the calendar event.
    /// </summary>
    public string Subject { get; set; }

    /// <summary>
    /// The description of the calendar event.
    /// </summary>
    public string Description { get; set; }

    /// <summary>
    /// The location of the calendar event.
    /// </summary>
    public string Location { get; set; }

    /// <summary>
    /// The start time and date of the calendar event.
    /// </summary>
    public DateTime Start { get; set; }

    /// <summary>
    /// The end time and date of the calendar event.
    /// </summary>
    public DateTime End { get; set; }

    /// <summary>
    /// Indicates whether the event is an all-day event.
    /// </summary>
    public bool AllDayEvent { get; set; }

    /// <summary>
    /// The encoding type for the event, either Universal or ICalendar.
    /// </summary>
    public EventEncoding Encoding { get; set; }
}
