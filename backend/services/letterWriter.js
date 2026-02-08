import { teluguToEnglish } from "./translateService.js";

export async function writeReply(teluguText) {
  const englishReason = await teluguToEnglish(teluguText);

  return `
To  
The Concerned Authority  

Sub: Reply to official communication – Reg.

Ref: Your letter received – Reg.

With reference to the subject and reference cited above, it is respectfully
submitted that ${englishReason}.

Hence, the matter is submitted for your kind perusal and necessary action.

Yours faithfully,  
Sub-Registrar  
Ibrahimpatnam
`;
}
