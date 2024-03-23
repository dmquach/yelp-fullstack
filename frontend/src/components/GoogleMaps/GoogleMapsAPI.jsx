
import "./map.css";
import { useState, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  OverlayView,
} from "@react-google-maps/api";
import { Link } from "react-router-dom";

import StarRating from "../Stars/StarRating";

const place = ["places"];

function getCenter(business) {
  const markers = Object.values(business).map((biz, i) => ({
    position: { lat: biz.lat, lng: biz.lng },
  }));
  const bounds = new window.google.maps.LatLngBounds();
  markers.forEach(({ position }) => bounds.extend(position));
  const { lat, lng } = bounds.getCenter().toJSON();
  return { lat, lng };
}

export default function GMap({ business }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
    libraries: place,
  });

  if (!isLoaded) return <div>Loading...</div>;

  const center = getCenter(business);

  return <Map business={business} center={center} />;
}
