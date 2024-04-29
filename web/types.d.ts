type Meta = {
    id: string,
    title: string,
    date: string,
}

type Doc = {
    meta: Meta,
    content: ReactElement<any, string | JSXElementConstructor<any>>,
}

type Folder = {
    name: string,
    children: Doc[]
}

export function isDoc(obj: any): obj is Doc {
    return (
      obj !== null &&
      typeof obj === 'object' &&
      typeof obj.parent === 'string' &&
      typeof obj.meta === 'object' &&
      typeof obj.meta.id === 'string' &&
      typeof obj.meta.title === 'string' &&
      typeof obj.meta.date === 'string' &&
      React.isValidElement(obj.content)
    );
}

export function isFolder(obj: any): obj is Folder {
    return (
      obj !== null &&
      typeof obj === 'object' &&
      typeof obj.name === 'string' &&
      Array.isArray(obj.children) &&
      obj.children.every(isDoc)
    );
  }