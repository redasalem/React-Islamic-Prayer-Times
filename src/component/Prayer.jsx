
export default function prayer({Name,time}) {
  return (
    <div className="prayer">
        <p className="name_prayer">{Name}</p>
        <p className="time_prayer">{time}</p>
    </div>
  )
}
