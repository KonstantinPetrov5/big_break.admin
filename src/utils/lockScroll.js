export const lockScrollHandler = state => {
    const bodyStyle = document.body.style
    bodyStyle.overflow = state ? 'hidden' : 'visible'
}