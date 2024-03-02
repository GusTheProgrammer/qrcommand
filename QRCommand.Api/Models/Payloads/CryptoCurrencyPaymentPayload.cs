namespace QRCommand.Api.Models.Payloads;

public enum CryptoCurrency
{
    Bitcoin,
    BitcoinCash,
    Litecoin
}

/// <summary>
/// Represents the payload for generating a cryptocurrency payment QR code.
/// </summary>
public class CryptoCurrencyPaymentPayload
{
    /// <summary>
    /// The cryptocurrency address of the payment receiver.
    /// </summary>
    public string Address { get; set; }

    /// <summary>
    /// The amount of cryptocurrency to transfer.
    /// </summary>
    public double? Amount { get; set; }

    /// <summary>
    /// A label for the transaction.
    /// </summary>
    public string Label { get; set; }

    /// <summary>
    /// A message or note for the transaction.
    /// </summary>
    public string Message { get; set; }

    /// <summary>
    /// The type of cryptocurrency (Bitcoin, BitcoinCash, Litecoin).
    /// </summary>
    public CryptoCurrency Currency { get; set; }
}
