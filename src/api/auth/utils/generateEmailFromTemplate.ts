import fs from 'fs';
import { join } from 'path';
import { LOGO_PATH } from '../constants';
 
const templatePath = join(
  process.cwd(),
  'public',
  'templates',
  'email-card.html'
);
 
export function generateEmailFromTemplate({
  title,
  textBlocks,
  linkHrefs,
}: {
  title: string;
  textBlocks: string[];
  linkHrefs: string[];
}) {
  const template = fs.readFileSync(templatePath, 'utf-8');
 
  // --- HTML Content Generation ---
  const contentHtml = `
        <div
          style="
            color: #737373;
            text-transform: uppercase;
            margin-top: 20px;
            margin-bottom: 10px;
            font-size: 14px;
          "
        >
          Continental Customer Portal
        </div>
 
        <div
          style="
            font-size: 20px;
            font-weight: 500;
            margin-bottom: 30px;
            color: #000000;
          "
        >
          ${title}
        </div>
 
        ${textBlocks
          .map(block => `<div style="margin-bottom: 15px">${block}</div>`)
          .join('\n')}
 
        ${linkHrefs
          .map(
            link =>
              `<div style="margin: 20px 0 0 0"><a href="${link}" target="_blank" style="color: #00a5dc; font-size: 14px; text-decoration: underline;">Click here to access link</a></div>`
          )
          .join('\n')}
      `;
 
  const emailHtml = template.replace(/{{contentHtml}}/g, contentHtml);
 
  // --- MANUAL PLAIN TEXT GENERATION ---
 
  const textBlocksContent = textBlocks.join('\n\n');
  const separator = '\n------------------------------\n';
  const linkContent = linkHrefs.join('\n');
 
  const footerText = `
Continental Aktiengesellschaft
Continental-Plaza 1
D-30175 Hannover
 
Handelsregister Amtsgericht Hannover, HR B 3527
USt-ID-Nr. DE115645799
`;
 
  const plainTextBody = `
${title}
 
${textBlocksContent}
 
${separator}
 
Links:
${linkContent}
 
${separator}
${footerText}
`;
 
  const attachments = [
    {
      filename: 'continental_logo.png',
      path: LOGO_PATH,
      cid: 'continental_logo',
    },
  ];
 
  return {
    html: emailHtml,
    text: plainTextBody.trim(),
    attachments,
  };
}