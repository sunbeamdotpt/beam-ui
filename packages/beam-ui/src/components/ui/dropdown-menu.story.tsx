import { DropdownMenu } from "./dropdown-menu.tsx";
import { Button } from "./button.tsx";

export default function DropdownMenuStory() {
  return (
    <DropdownMenu
      groups={[
        {
          label: "Actions",
          items: [
            { label: "Edit", icon: "edit", onClick: () => {} },
            { label: "Duplicate", icon: "content_copy", onClick: () => {} },
            { label: "Archive", icon: "archive", onClick: () => {} },
          ],
        },
        {
          label: "Danger Zone",
          items: [
            { label: "Delete", icon: "delete", onClick: () => {}, danger: true },
          ],
        },
      ]}
    >
      <Button variant="ghost">Open Menu</Button>
    </DropdownMenu>
  );
}

export function FlatItems() {
  return (
    <DropdownMenu
      items={[
        { label: "Profile", icon: "person", onClick: () => {} },
        { label: "Settings", icon: "settings", onClick: () => {} },
        { label: "Sign out", icon: "logout", onClick: () => {} },
      ]}
    >
      <Button variant="ghost">Account</Button>
    </DropdownMenu>
  );
}

export function WithDisabledItem() {
  return (
    <DropdownMenu
      items={[
        { label: "Edit", icon: "edit", onClick: () => {} },
        { label: "Delete", icon: "delete", onClick: () => {}, disabled: true },
      ]}
    >
      <Button variant="ghost">Actions</Button>
    </DropdownMenu>
  );
}
