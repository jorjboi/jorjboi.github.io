---
layout: page
title: Limb Autorigger
description: A Python plugin for Maya to auto-rig limbs. Supports IK/FK blending and stretchy bones.
img: assets/img/arm_rig_demo.gif
importance: 2
category: work
related_publications: false
---

I wrote a Python script in Maya to automatically rig a limb to support IK/FK blending and “stretchy bones” (a skeleton with deformation). The repo is [here].

To rig a limb, run the following in the Script Editor:

```
import importlib
import lrig.limb as limb
importlib.reload(limb)
limb.create_limb()
```

Running will create a set of IK joints, FK joints, bind joints for skin binding, and a set of controls and handles. The arm control has an IK-FK attribute, which controls the interpolation of bind joints between IK and FK joints.



