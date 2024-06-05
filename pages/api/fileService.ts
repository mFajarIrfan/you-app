import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import { promises as fsPromises, existsSync, mkdirSync } from 'fs';

const uploadDir = path.join(process.cwd(), 'public/assets');

if (!existsSync(uploadDir)) {
  mkdirSync(uploadDir, { recursive: true });
}

const form = formidable({ multiples: true, uploadDir, keepExtensions: true });

interface ProfileDTO {
  name: string;
  birthDate: string;
  gender: string;
  horoscope: string
  zodiac: string
  image: string;
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const profileFilePath = path.join(uploadDir, 'profile.json');
      const data = await fsPromises.readFile(profileFilePath, 'utf-8');
      const profileData = JSON.parse(data);
      return res.status(200).json(profileData);
    } catch (error) {
      console.error('Error reading profile data', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST', 'GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form data', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
      const birthDate = Array.isArray(fields.birthDate) ? fields.birthDate[0] : fields.birthDate;
      const gender = Array.isArray(fields.gender) ? fields.gender[0] : fields.gender;
      const horoscope = Array.isArray(fields.horoscope) ? fields.horoscope[0] : fields.gender
      const zodiac = Array.isArray(fields.zodiac) ? fields.zodiac[0] : fields.zodiac
      const imageData = Array.isArray(fields.image) ? fields.image[0] : fields.image

      console.log('Parsed fields:', { name, birthDate, gender });

      if (!imageData) {
        console.error('No image data provided');
        return res.status(400).json({ message: 'No image data provided' });
      }

      const profileData: ProfileDTO = {
        name: name as string,
        birthDate: birthDate as string,
        gender: gender as string,
        horoscope: horoscope as string,
        zodiac: zodiac as string,
        image: imageData,
      };

      const profileFilePath = path.join(uploadDir, 'profile.json');
      console.log('Writing profile data to:', profileFilePath);
      await fsPromises.writeFile(profileFilePath, JSON.stringify(profileData, null, 2));

      return res.status(200).json({ message: 'Profile data saved successfully' });
    });
  } catch (error) {
    console.error('Error handling request', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
