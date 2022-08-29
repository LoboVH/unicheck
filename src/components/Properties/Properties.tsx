import "./properties.scss"

import CloseIcon from "@mui/icons-material/Close"

const Properties = ({ state, setState }) => {
  const addProperty = () => {
    setState([
      ...state,
      {
        property: "",
        value: "",
      },
    ])
  }
  const handleChange = (e:any, index:any) => {
    const { name, value } = e.target
    const list = [...state]
    list[index][name] = value
    setState(list)
  }
  const handleRemove = (index:any) => {
    if (state.length === 1) {
      return setState([
        {
          property: "",
          value: "",
        },
      ])
    }
    const list = [...state]
    list.splice(index, 1)
    setState(list)
  }
  return (
    <>
      <div className="adding-values">
        <div className="values">
          <span className="head">Type</span>
          {state.map((singleProperty:any, index:any) => (
            <PropertyInput
              key={index}
              name={"property"}
              state={singleProperty.property}
              handleChange={handleChange}
              index={index}
              handleRemove={handleRemove}
            />
          ))}
        </div>
        <div className="values">
          <span className="head">Name</span>
          {state.map((singleProperty:any, index:any) => (
            // @ts-ignore
            <PropertyInput
              key={index}
              name={"value"}
              state={singleProperty.value}
              handleChange={handleChange}
              index={index}
            />
          ))}
        </div>
      </div>
      <button onClick={addProperty} className="btn-outline">
        Add More
      </button>
    </>
  )
}

const PropertyInput = ({ state, handleChange, handleRemove, index, name }) => {
  return (
    <div className="property-input">
      {name !== "value" && (
        <CloseIcon
          onClick={() => handleRemove(index)}
          fontSize="small"
          className="close"
        />
      )}
      <input
        type="text"
        name={name}
        value={state}
        onChange={(e:any) => handleChange(e, index)}
        placeholder={name}
      />
    </div>
  )
}

export default Properties
