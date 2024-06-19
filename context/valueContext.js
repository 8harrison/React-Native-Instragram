import { createContext, useState } from 'react';

export const ValueContext = createContext();

export default function Context({ children }) {
  const [photo, setphoto] = useState();
  const [choseTakePhoto, setChoseTakePhoto] = useState(false);
  const [description, setDescription] = useState('');

  return (
    <ValueContext.Provider
      value={{
        choseTakePhoto,
        setChoseTakePhoto,
        description,
        setDescription,
        photo,
        setphoto,
      }}>
      {children}
    </ValueContext.Provider>
  );
}
