// import AssetManager from './AssetManager'
import Elements from './Elements'
import Properties from './Properties'
import Style from './Style'

const Compose = () => (
  <div key="compose" class="compose-tab" container="column #top @stretch">
    {/* <AssetManager /> */}

    <Elements />
    <Properties />
    <Style />
  </div>
)

export default Compose