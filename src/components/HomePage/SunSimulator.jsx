import Address from "../MapServices/Address";
import ModelComponent from "../3D_Model/ModelComponent";
import SelectedInfo from "../inputComponents/components/SelectedInfo";

const SunSimulator = () => {
    return (
        <div className="bg-teal-600 px-4 p-6 mx-auto max-w-7xl rounded-lg">
            <Address />
            <ModelComponent />
            <SelectedInfo />
        </div>
    )
}

export default SunSimulator