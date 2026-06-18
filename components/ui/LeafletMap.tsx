"use client";

import "leaflet/dist/leaflet.css";
import { Fragment } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L from "leaflet";

export type MapPin = {
  name: string;
  coord: [number, number];
};

/** 受け入れ先（日本）。各国からここへアークを伸ばす。 */
const JAPAN: [number, number] = [35.6762, 139.6503];

/** 国ピン（ネオン調ドット＋パルス＋グラスラベル）。CSSは globals.css の .ssw-pin* */
function createPinIcon(name: string, variant: "origin" | "dest" = "origin") {
  return L.divIcon({
    className: "ssw-pin-icon",
    html: `
      <span class="ssw-pin__pulse ssw-pin__pulse--${variant}"></span>
      <span class="ssw-pin__dot ssw-pin__dot--${variant}"></span>
      <span class="ssw-pin__label ssw-pin__label--${variant}">${name}</span>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
}

/** 2点間の緩やかな曲線（2次ベジエ）座標列を生成し、アークとして描画する。 */
function buildArc(
  from: [number, number],
  to: [number, number],
  bend = 0.18,
  segments = 56,
): [number, number][] {
  const [lat1, lng1] = from;
  const [lat2, lng2] = to;
  const mLat = (lat1 + lat2) / 2;
  const mLng = (lng1 + lng2) / 2;
  const dLng = lng2 - lng1;
  // 中点を北（高緯度）側へ持ち上げた制御点で、フライトパス風に上へ弓なりにする
  const cLat = mLat + Math.abs(dLng) * bend;
  const cLng = mLng;

  const pts: [number, number][] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const lat =
      (1 - t) * (1 - t) * lat1 + 2 * (1 - t) * t * cLat + t * t * lat2;
    const lng =
      (1 - t) * (1 - t) * lng1 + 2 * (1 - t) * t * cLng + t * t * lng2;
    pts.push([lat, lng]);
  }
  return pts;
}

export default function LeafletMap({ pins }: { pins: MapPin[] }) {
  const bounds = L.latLngBounds([...pins.map((p) => p.coord), JAPAN]);

  return (
    <MapContainer
      bounds={bounds}
      boundsOptions={{ padding: [55, 55] }}
      scrollWheelZoom={false}
      zoomControl={false}
      attributionControl
      dragging={false}
      doubleClickZoom={false}
      touchZoom={false}
      keyboard={false}
      style={{ height: "100%", width: "100%", background: "#eef3fb" }}
    >
      {/* CartoDB Positron（明るくミニマル / ラベルなし / APIキー不要） */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        subdomains="abcd"
        maxZoom={19}
      />

      {/* 各国 → 日本 のアーク（やわらかいグロー下地＋ゆったり流れる点線） */}
      {pins.map((p) => {
        const arc = buildArc(p.coord, JAPAN);
        return (
          <Fragment key={`arc-${p.name}`}>
            <Polyline
              positions={arc}
              pathOptions={{
                className: "ssw-arc-glow",
                color: "#f072a6",
                weight: 6,
                opacity: 0.16,
              }}
            />
            <Polyline
              positions={arc}
              pathOptions={{
                className: "ssw-arc",
                color: "#e34a85",
                weight: 1.8,
                opacity: 0.9,
              }}
            />
          </Fragment>
        );
      })}

      {/* 国ピン */}
      {pins.map((p) => (
        <Marker key={p.name} position={p.coord} icon={createPinIcon(p.name)} />
      ))}

      {/* 受け入れ先：日本 */}
      <Marker position={JAPAN} icon={createPinIcon("日本", "dest")} />
    </MapContainer>
  );
}
