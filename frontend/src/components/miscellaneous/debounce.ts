function debounce<T extends (...args: any[]) => void>(func: T, delay: number = 1000): (...args: Parameters<T>) => void {
    let timeout: ReturnType<typeof setTimeout>;
    return (...args) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            func(...args);
        }, delay)

    }
}
export default debounce