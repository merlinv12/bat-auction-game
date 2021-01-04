import axios, { AxiosResponse } from "axios"

const baseUrl: string = "http://localhost:8000"

// The generic for AxiosResponse get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
// so without the AxiosResponse type we could say axios.get<Listing[]>
export const getListings = async (): Promise<AxiosResponse<Listing[]>> => {
  try {
    const listings: AxiosResponse<Listing[]> = await axios.get(
      baseUrl + "/listings"
    )
    return listings
  } catch (error) {
    throw new Error(error)
  }
}