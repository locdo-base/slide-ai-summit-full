import { SlideFrame } from '../../../ui/SlideFrame'

/* A stop after the monolith: Jeff's mandate as the statement, and the
   question it raises — what is a service, or a service-oriented architecture?
   Nothing else. */
export function ServiceStopSlide() {
  return (
    <SlideFrame
      layout="center"
      headline={<>Jeff: <em className="lit">Everything must be a service.</em></>}
      lead="Service là gì? Kiến trúc hướng dịch vụ (SOA) là gì?"
    />
  )
}
