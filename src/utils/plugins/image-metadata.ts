// Similiar structure to:
// https://github.com/JS-DevTools/rehype-inline-svg/blob/master/src/inline-svg.ts
import imageSize from 'image-size';
import { ISizeCalculationResult } from 'image-size/dist/types/interface';
import path from 'path';
import { getPlaiceholder } from 'plaiceholder';
import { IGetBlurhashReturn } from 'plaiceholder/dist/blurhash';
import { Processor } from 'unified';
import { Node } from 'unist';
import { visit } from 'unist-util-visit';
import { promisify } from 'util';
import { VFile } from 'vfile';

const sizeOf = promisify(imageSize);

/**
 * An `<img>` HAST node
 */
interface ImageNode extends Node {
  type: 'element';
  tagName: 'img';
  properties: {
    src: string;
    height?: number;
    width?: number;
    blurDataURL?: string;
    placeholder?: 'blur' | 'empty';
  };
}

/**
 * Determines whether the given HAST node is an `<img>` element.
 */
function isImageNode(node: Node): node is ImageNode {
  const img = node as ImageNode;
  return (
    img.type === 'element' &&
    img.tagName === 'img' &&
    img.properties &&
    typeof img.properties.src === 'string'
  );
}

/**
 * Adds the image's `height` and `width` to it's properties.
 */
async function addMetadata(node: ImageNode): Promise<void> {
  let res: ISizeCalculationResult;
  let blurhash: IGetBlurhashReturn;
  const isExternal = node.properties.src.startsWith('http');

  if (!isExternal) {
    res = await sizeOf(path.join(process.cwd(), 'public', node.properties.src));
    blurhash = (await getPlaiceholder(node.properties.src)).blurhash
  } else {
    const imageRes = await fetch(node.properties.src);
    const arrayBuffer = await imageRes.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    res = await imageSize(buffer);
    blurhash = (await getPlaiceholder(buffer)).blurhash
  }

  if (!res) throw Error(`Invalid image with src "${node.properties.src}"`);

  node.properties.width = res.width;
  node.properties.height = res.height;

  node.properties.blurDataURL = blurhash.hash;
  node.properties.placeholder = 'blur'
}

/**
 * This is a Rehype plugin that finds image `<img>` elements and adds the height and width to the properties.
 * Read more about Next.js image: https://nextjs.org/docs/api-reference/next/image#layout
 */
export default function imageMetadata(this: Processor) {
  return async function transformer(tree: Node, file: VFile): Promise<Node> {
    const imgNodes: ImageNode[] = [];

    visit(tree, 'element', (node) => {
      if (isImageNode(node)) {
        imgNodes.push(node);
      }
    });

    for (const node of imgNodes) {
      await addMetadata(node);
    }

    return tree;
  };
}