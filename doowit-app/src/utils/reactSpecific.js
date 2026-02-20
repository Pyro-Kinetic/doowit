export function setCountState(func) {
    func(prev => {
        if (prev >= 1) return prev - 1
        else return prev + 1
    })
}


