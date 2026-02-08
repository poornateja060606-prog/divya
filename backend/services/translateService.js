import { translate } from "@vitalets/google-translate-api";

export async function teluguToEnglish(teluguText) {
  const result = await translate(teluguText, {
    from: "te",
    to: "en"
  });

  return result.text;
}
