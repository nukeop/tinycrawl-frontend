export const mapSlotToIcon = slot => {
  switch(slot) {
  case 'headgear':
    return 'robot-helmet';
  case 'weapon':
    return 'bolter-gun';
  case 'suit':
    return 'chest-armor';
  case 'external_suit':
    return 'space-suit';
  case 'accessory':
    return 'canister';
  default:
    return 'unknown';
  }
};
