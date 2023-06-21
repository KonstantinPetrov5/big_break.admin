import s from './ColorSelect.module.sass'


const ColorSelect = ({ state, setState }) => {


    const colors = ['#4B21B1', '#EA3352', '#ED6E42', '#F6C54E', '#24B121', '#4245e0']


    return (

        <div className={ s.container }>
            {
                colors.map( clr =>
                    <div
                        key={clr}
                        className={ s.colorBox }
                        data-color={clr}
                        data-select={state===clr}
                        onClick={ () => setState(clr) }
                    />
                )
            }
        </div>

    )
}


export default ColorSelect