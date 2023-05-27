"use client";

import React from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MOSCOW_DISTRICTS_GEO_JSON } from "./geo";
import { useFormContext, useWatch } from "react-hook-form";
import { get, find } from "lodash";

interface Props {
  className: string;
  areasOptions: { value: any; label: any }[];
}
const AreaMap = ({ className, areasOptions }: Props) => {
  const formContext = useFormContext();

  const currentArea = useWatch({
    name: "area",
  });

  function handleClickPolygon(e: any) {
    const featureProperties = get(e, "layer.feature.properties");
    const ABBREV = featureProperties?.ABBREV;
    formContext.setValue(
      "area",
      find(areasOptions, (areasOption) => areasOption.label === ABBREV)
    );
  }

  function style(feature: any) {
    const isCurrentArea = feature?.properties?.ABBREV === currentArea?.label;

    const fillColor = isCurrentArea ? "red" : "transparent";

    return {
      fillColor,
      weight: 2,
      opacity: 0.4,
      color: "red", //Outline color
      fillOpacity: 0.2,
    };
  }

  return (
    <div className={className}>
      <MapContainer
        center={[55.755829, 37.617627]}
        zoom={9}
        style={{ height: "100%", width: "100%" }}
        attributionControl={false}
        scrollWheelZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <GeoJSON
          //@ts-ignore
          data={MOSCOW_DISTRICTS_GEO_JSON}
          style={style}
          eventHandlers={{
            click: handleClickPolygon,
          }}
          // onEachFeature={(feature, layer) => {
          //   layer.on({
          //     mouseover: (e) => {
          //       e.target.setStyle({ fillColor: "blue" });
          //     },
          //     mouseout: (e) => {
          //       e.target.setStyle({ fillColor: "red" });
          //     },
          //   });
          // }}
        />
      </MapContainer>
    </div>
  );
};

export default AreaMap;
