import axios, { AxiosResponse } from "axios"

const baseUrl: string = "http://localhost:8000"

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
