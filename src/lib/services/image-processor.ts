import html2canvas from 'html2canvas';
import pixelmatch from 'pixelmatch';
import type { Difference } from '../models';

export class ImageProcessor {
  constructor() { } 

  public async generateCanvas(data) {
    const htmlElement = this.generateHtml(data.detail.html, data.detail.css);
    const iframeDocument = this.addHtmlToDom(htmlElement, data.detail.iframe);
    return await html2canvas(iframeDocument);
  }

  public compare(playground: ImageData, reference: ImageData, width: number, height: number): Difference {
    const diffCanvas = document.createElement('canvas');
    diffCanvas.width = width;
    diffCanvas.height = height;

    const diffContext = diffCanvas.getContext('2d');
    const diff = diffContext.createImageData(width, height);

    const mismatch = pixelmatch(playground.data, reference.data, diff.data, width, height, 
      {
        threshold: 0.01,
        includeAA: false,
      }
    );
    diffContext.putImageData(diff, 0, 0);

    return {
      quality: (1 - mismatch / (width * height)) * 100,
      src: diffCanvas.toDataURL()
    };
  }

  private generateHtml(html: string, css: string) {
    const cssText = `<${''}style> ${css}</${''}style>`;
    const combinedText = `<div>${cssText}${html}</div>`;

    const parsedHtml = new DOMParser().parseFromString(combinedText, "text/html");
    return parsedHtml.body.firstChild;
  }

  private addHtmlToDom(element, iframe) {
    const iframeBody = this.getIframeBody(iframe);
    iframeBody.replaceChildren(element);

    return iframeBody;
  }

  private getIframeBody(iframe) {
    return iframe.contentWindow.document.body;
  }
}