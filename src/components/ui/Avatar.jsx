// 📖 Reusable Avatar - shows first letter of name inside a colored circle
function Avatar({ name, color, size = 'w-8 h-8' }) {
  return (
    <div
      className={`${color} ${size} rounded-full text-white flex items-center justify-center font-bold flex-shrink-0`}
      title={name}
    >
      {name ? name.charAt(0).toUpperCase() : '?'}
    </div>
  )
}

export default Avatar
