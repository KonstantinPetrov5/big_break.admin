import {useEffect} from 'react'


export const useClickOutside = (ref, isOpen, handler) => {

    useEffect( () => {

        if (!isOpen) return

        const listener = ({ target }) => {
            if (!ref || ref.contains(target)) return
            handler()
        }
        document.addEventListener("mouseup", listener)
        document.addEventListener("touchcancel", listener)

        return () => {
            document.removeEventListener("mouseup", listener)
            document.removeEventListener("touchcancel", listener)
        }

    }, [isOpen] )
}