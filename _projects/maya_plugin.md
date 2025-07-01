---
layout: page
title: Limb Autorigger
description: A Python plugin for Maya to auto-rig limbs. Supports IK/FK blending and stretchy bones.
img: assets/img/arm_rig_demo.gif
importance: 2
category: work
related_publications: false
---

I wrote a Python script in Maya to automatically rig a limb to support IK/FK blending and “stretchy bones” (a skeleton with deformation). This was done for part of Nick Miller’s Master Rigging and Python Scripting [class](https://www.thegnomonworkshop.com/tutorials/master-rigging-python-scripting-in-maya). The repo is [here](https://github.com/jorjboi/limb-autorigger).

To rig a limb, run the following in the Script Editor:

```
import importlib
import lrig.limb as limb
importlib.reload(limb)

limb.create_limb()
```

Running will create a set of IK joints, FK joints, bind joints for skin binding, and a set of controls and handles. The arm control has an IK-FK attribute, which controls the interpolation of bind joints between IK and FK joints.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/maya_plugin/ik-fk-blend.gif" title="IK-FK interpolation" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    IK-FK interpolation
</div>

This rig setup also supports stretching IK and FK joints for stretchy skeletons.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/maya_plugin/ik_stretch_2.gif" title="Stretchy Bones" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    IK Stretching
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/maya_plugin/fk_stretch_2.gif" title="Stretchy Bones" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    FK Stretching
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/maya_plugin/stretchy_bones.gif" title="Stretchy Bones" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Stretchy bones
</div>


