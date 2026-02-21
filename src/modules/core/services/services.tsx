export const mockApiCall = <T,>({
    data,
    delay = 2000,
    ok,
    errorMessage = 'Error en la operación',
}: {
    data: T
    delay?: number
    ok: boolean
    errorMessage?: string
}): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
        setTimeout(() => {
            if (ok) {
                resolve(data)
            } else {
                reject(new Error(errorMessage))
            }
        }, delay)
    })
}
