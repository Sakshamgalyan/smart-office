import { useSelector } from "react-redux";

export default function InteractionUI() {
  const nearby = useSelector((s: any) => s.presence.nearbyUser);

  if (!nearby) return null;

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/80 p-4 rounded-xl">
      <button className="btn">Chat</button>
      <button className="btn ml-2">Call</button>
    </div>
  );
}
