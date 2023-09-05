export type FormDataType = {
    name: string;
    email: string;
  };
  
  export type NewDataEntryType = FormDataType & {
    imgPath: string | null;
    id: string;
  };