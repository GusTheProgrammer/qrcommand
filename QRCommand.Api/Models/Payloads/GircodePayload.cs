namespace QRCommand.Api.Models.Payloads;

public enum TypeOfRemittance
{
    Structured,
    Unstructured
}

public enum GirocodeVersion
{
    Version1,
    Version2
}

public enum GirocodeEncoding
{
    ISO_8859_1,
    UTF_8
}

/// <summary>
/// Represents the payload for generating a Girocode (SEPA payment) QR code.
/// </summary>
public class GirocodePayload
{
    /// <summary>
    /// The IBAN of the beneficiary.
    /// </summary>
    public string Iban { get; set; }

    /// <summary>
    /// The BIC of the beneficiary's bank.
    /// </summary>
    public string Bic { get; set; }

    /// <summary>
    /// The name of the beneficiary.
    /// </summary>
    public string Name { get; set; }

    /// <summary>
    /// The amount of the credit transfer in Euro.
    /// </summary>
    public decimal Amount { get; set; }

    /// <summary>
    /// Optional remittance information (reference text).
    /// </summary>
    public string RemittanceInformation { get; set; }

    /// <summary>
    /// Indicates whether the remittance information is structured or unstructured.
    /// </summary>
    public TypeOfRemittance TypeOfRemittance { get; set; }

    /// <summary>
    /// Optional purpose of the credit transfer.
    /// </summary>
    public string PurposeOfCreditTransfer { get; set; }

    /// <summary>
    /// Optional message to the Girocode user.
    /// </summary>
    public string MessageToGirocodeUser { get; set; }

    /// <summary>
    /// The version of the Girocode.
    /// </summary>
    public GirocodeVersion Version { get; set; }

    /// <summary>
    /// The encoding of the Girocode payload.
    /// </summary>
    public GirocodeEncoding Encoding { get; set; }
}