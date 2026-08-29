import type { InvitationTemplate } from "./types";

import { template001 } from "./template-001/index";
import { template002 } from "./template-002/index";
import { template003 } from "./template-003/index";
import { template004 } from "./template-004/index";
import { template005 } from "./template-005/index";

export const templateRegistry: Partial<
  Record<string, InvitationTemplate>
> = {
  [template001.id]: template001,
  [template002.id]: template002,
  [template003.id]: template003,
  [template004.id]: template004,
  [template005.id]: template005,
};
