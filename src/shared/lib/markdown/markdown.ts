import MarkdownIt from 'markdown-it';
import DOMPurify from 'dompurify';


 // Sanitize and convert selftext markdown to HTML
 const md = new MarkdownIt();
 export const renderSelfText = (text: string): { __html: string } | undefined => {
        if (text) {
            const sanitizedHtml = DOMPurify.sanitize(md.render(text));
            return { __html: sanitizedHtml };
        }
        return undefined;
    };