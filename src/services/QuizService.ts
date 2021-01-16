import axios, { AxiosResponse } from "axios"
import * as dotenv from 'dotenv';
dotenv.config({path: '../../.env.local'})


const baseUrl: string = process.env.API_URL ?? '';

// The generic for AxiosResponse get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
export const getListings = async (limit: number = 10): Promise<AxiosResponse<Listing[]>> => {
  try {
    const listings: AxiosResponse<Listing[]> = await axios.get(
      `${baseUrl}/listings?_limit=${limit}`
    )
    return listings
  } catch (error) {
    throw new Error(error)
  }
}
