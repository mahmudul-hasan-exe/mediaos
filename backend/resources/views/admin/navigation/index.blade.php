@extends('layouts.admin')

@section('title', 'Navigation & Menus')

@section('content')
<div class="space-y-6"
     x-data="{
         modalOpen: false,
         menuLabel: '',
         selectedLocations: ['{{ $activeLocation }}'],
         selectedParentId: '',
         openAddFor(loc, parentId = '') {
             this.menuLabel = '';
             this.selectedLocations = [loc];
             this.selectedParentId = parentId;
             this.modalOpen = true;
             this.$nextTick(() => this.$refs.menuLabelInput?.focus());
         },
         toggleLoc(loc) {
             if (this.selectedLocations.includes(loc)) {
                 if (this.selectedLocations.length > 1) {
                     this.selectedLocations = this.selectedLocations.filter(l => l !== loc);
                 }
             } else {
                 this.selectedLocations.push(loc);
             }
         }
     }">

    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
            <h1 class="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Navigation &amp; Menus</h1>
            <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Manage Header Bar, Sections, More dropdown, and Side Menu items for {{ $tenant->name }}</p>
        </div>
        <div class="flex items-center gap-2.5">
            <button @click="openAddFor('{{ $activeLocation }}')"
                    type="button"
                    class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-black text-white dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 text-xs font-medium shadow-xs hover:shadow-sm transition-all active:scale-[0.98] cursor-pointer">
                <i class="ri-add-line text-sm"></i>
                <span>Add Menu Item</span>
            </button>
        </div>
    </div>

    <!-- 4 Menu Zones Cards (Matches MediaOS 4-Card Summary Grid Pattern) -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        @foreach($locations as $locKey => $locMeta)
            @php
                $isCurrent = $activeLocation === $locKey;
                $itemCount = $countsByLocation[$locKey] ?? 0;
            @endphp
            <a href="{{ route('admin.navigation.index', ['location' => $locKey]) }}"
               class="rounded-xl border p-4 sm:p-5 transition block {{ $isCurrent ? 'border-zinc-900 dark:border-zinc-100 bg-white dark:bg-zinc-900 ring-1 ring-zinc-900 dark:ring-zinc-100 shadow-xs' : 'border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-xs' }}">
                <div class="flex items-center justify-between">
                    <p class="text-xs font-medium {{ $isCurrent ? 'text-zinc-900 dark:text-zinc-50' : 'text-zinc-500 dark:text-zinc-400' }}">
                        {{ $locMeta['label'] }}
                    </p>
                    <i class="{{ $locMeta['icon'] }} text-lg {{ $isCurrent ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-400' }}"></i>
                </div>
                <p class="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mt-2">{{ $itemCount }}</p>
                <p class="text-[11px] text-zinc-400 mt-1 line-clamp-1">{{ $locMeta['short_hint'] }}</p>
            </a>
        @endforeach
    </div>

    <!-- Active Menu Zone Table Card -->
    <div class="rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 overflow-hidden shadow-xs">
        <!-- Toolbar -->
        <div class="p-4 sm:p-5 border-b border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <form method="GET" action="{{ route('admin.navigation.index') }}" class="flex-1 flex flex-col sm:flex-row sm:items-center gap-2.5">
                <input type="hidden" name="location" value="{{ $activeLocation }}">
                <div class="relative flex-1 max-w-md">
                    <svg class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                    <input type="text"
                           name="search"
                           value="{{ request('search') }}"
                           placeholder="Search in {{ $locations[$activeLocation]['label'] }}..."
                           class="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/60 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-blue-500">
                </div>

                <div class="flex items-center gap-2">
                    <select name="status" onchange="this.form.submit()" class="text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 px-3 py-1.5 focus:outline-none">
                        <option value="all" {{ request('status') == 'all' || !request('status') ? 'selected' : '' }}>All Status</option>
                        <option value="active" {{ request('status') == 'active' ? 'selected' : '' }}>Active</option>
                        <option value="hidden" {{ request('status') == 'hidden' ? 'selected' : '' }}>Hidden</option>
                    </select>

                    @if(request('search') || (request('status') && request('status') !== 'all'))
                        <a href="{{ route('admin.navigation.index', ['location' => $activeLocation]) }}" class="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 px-2 py-1">Reset</a>
                    @endif
                </div>
            </form>
        </div>

        <!-- Menu Items Table -->
        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
                <thead>
                    <tr class="border-b border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/80 text-zinc-500 dark:text-zinc-400 font-medium uppercase tracking-wider text-[11px]">
                        <th class="py-3 px-5">Menu Name</th>
                        <th class="py-3 px-4">Linked Section</th>
                        <th class="py-3 px-4 text-center">Status</th>
                        <th class="py-3 px-5 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-zinc-100 dark:divide-zinc-800/60">
                    @forelse($menuItems as $item)
                        <tr x-data="{ editing: false, addingSub: false }" class="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40 transition align-top">
                            <!-- Menu Label & Sub-Items -->
                            <td class="py-3.5 px-5">
                                <div x-show="!editing">
                                    <div class="flex items-center gap-2">
                                        <span class="font-medium text-sm {{ $item->is_active ? 'text-zinc-900 dark:text-zinc-100' : 'line-through text-zinc-400' }}">
                                            {{ $item->label }}
                                        </span>
                                        @if($activeLocation === 'drawer' && $item->children->isNotEmpty())
                                            <span class="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                                                {{ $item->children->count() }} sub
                                            </span>
                                        @endif
                                    </div>

                                    <!-- Nested Sub-menus (Side Menu) -->
                                    @if($item->children->isNotEmpty())
                                        <div class="mt-2.5 pl-3.5 border-l border-zinc-200 dark:border-zinc-800 space-y-1.5">
                                            @foreach($item->children as $child)
                                                <div x-data="{ editChild: false }">
                                                    <div class="flex items-center justify-between gap-4 py-0.5">
                                                        <div class="flex items-center gap-2 min-w-0">
                                                            <span class="text-zinc-400">↳</span>
                                                            <span class="{{ $child->is_active ? 'text-zinc-700 dark:text-zinc-300' : 'line-through text-zinc-400' }}">{{ $child->label }}</span>
                                                        </div>
                                                        <div class="flex items-center gap-2.5 shrink-0 text-[11px]">
                                                            <form method="POST" action="{{ route('admin.navigation.toggle', $child) }}">
                                                                @csrf @method('PATCH')
                                                                <button type="submit" class="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer">
                                                                    {{ $child->is_active ? 'Hide' : 'Show' }}
                                                                </button>
                                                            </form>
                                                            <button type="button" @click="editChild = !editChild" class="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer">
                                                                Rename
                                                            </button>
                                                            <form method="POST" action="{{ route('admin.navigation.destroy', $child) }}"
                                                                  onsubmit="return confirmDelete(event, 'Delete sub-menu &quot;{{ addslashes($child->label) }}&quot;?')">
                                                                @csrf @method('DELETE')
                                                                <button type="submit" class="text-zinc-400 hover:text-red-600 cursor-pointer">Delete</button>
                                                            </form>
                                                        </div>
                                                    </div>

                                                    <form x-show="editChild" x-cloak method="POST" action="{{ route('admin.navigation.update', $child) }}"
                                                          class="mt-1.5 flex items-center gap-2">
                                                        @csrf @method('PUT')
                                                        <input type="text" name="label" value="{{ $child->label }}" required
                                                               class="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 px-2.5 py-1 text-xs">
                                                        <button type="submit" class="px-3 py-1 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-medium cursor-pointer">
                                                            Save
                                                        </button>
                                                        <button type="button" @click="editChild = false" class="px-2 py-1 text-xs text-zinc-400 cursor-pointer">
                                                            Cancel
                                                        </button>
                                                    </form>
                                                </div>
                                            @endforeach
                                        </div>
                                    @endif

                                    <!-- Quick Inline Add Sub-menu Form (Side Menu rows) -->
                                    @if($activeLocation === 'drawer')
                                        <form x-show="addingSub" x-cloak method="POST" action="{{ route('admin.navigation.store') }}"
                                              class="mt-2.5 pl-3.5 border-l-2 border-zinc-900 dark:border-zinc-100 flex items-center gap-2">
                                            @csrf
                                            <input type="hidden" name="location" value="drawer">
                                            <input type="hidden" name="parent_id" value="{{ $item->id }}">
                                            <input type="text" name="label" x-ref="subInput" required placeholder="Sub-menu name (e.g. Diplomacy & Treaties)..."
                                                   class="w-56 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 px-2.5 py-1.5 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-500">
                                            <button type="submit" class="px-3 py-1.5 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-medium cursor-pointer">
                                                Add
                                            </button>
                                            <button type="button" @click="addingSub = false" class="px-2 py-1.5 text-xs text-zinc-400 hover:text-zinc-700 cursor-pointer">
                                                Cancel
                                            </button>
                                        </form>
                                    @endif
                                </div>

                                <!-- Simple Rename Form -->
                                <form x-show="editing" x-cloak method="POST" action="{{ route('admin.navigation.update', $item) }}"
                                      class="flex items-center gap-2">
                                    @csrf @method('PUT')
                                    <input type="text" name="label" value="{{ $item->label }}" required
                                           class="w-56 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 px-2.5 py-1.5 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-500">
                                    <button type="submit" class="px-3 py-1.5 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-medium cursor-pointer">
                                        Save
                                    </button>
                                    <button type="button" @click="editing = false" class="px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500 cursor-pointer">
                                        Cancel
                                    </button>
                                </form>
                            </td>

                            <!-- Linked Category / Page Type -->
                            <td class="py-3.5 px-4 whitespace-nowrap">
                                @if($item->category)
                                    <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                                        {{ $item->category->name }}
                                    </span>
                                @else
                                    <span class="text-[11px] text-zinc-400">{{ $locations[$activeLocation]['label'] }}</span>
                                @endif
                            </td>

                            <!-- Status -->
                            <td class="py-3.5 px-4 text-center whitespace-nowrap">
                                <form method="POST" action="{{ route('admin.navigation.toggle', $item) }}">
                                    @csrf @method('PATCH')
                                    <button type="submit"
                                            class="px-2.5 py-0.5 rounded-full text-[11px] font-medium cursor-pointer transition {{ $item->is_active ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400' : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400' }}">
                                        {{ $item->is_active ? 'Active' : 'Hidden' }}
                                    </button>
                                </form>
                            </td>

                            <!-- Actions -->
                            <td class="py-3.5 px-5 text-right whitespace-nowrap">
                                <div class="inline-flex items-center gap-3 text-xs">
                                    @if($activeLocation === 'drawer' && strtolower($item->label) !== 'home')
                                        <button type="button"
                                                @click="addingSub = !addingSub; editing = false; if (addingSub) $nextTick(() => $refs.subInput?.focus())"
                                                class="font-medium text-zinc-700 dark:text-zinc-200 hover:text-black dark:hover:text-white cursor-pointer">
                                            + Sub-menu
                                        </button>
                                    @endif
                                    <button type="button" @click="editing = !editing; addingSub = false"
                                            class="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer">
                                        Rename
                                    </button>
                                    <form method="POST" action="{{ route('admin.navigation.destroy', $item) }}"
                                          onsubmit="return confirmDelete(event, 'Delete menu item &quot;{{ addslashes($item->label) }}&quot;?')">
                                        @csrf @method('DELETE')
                                        <button type="submit" class="text-zinc-400 hover:text-red-600 cursor-pointer">Delete</button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="4" class="py-10 px-5 text-center text-xs text-zinc-400">
                                No items in {{ $locations[$activeLocation]['label'] }} yet. Click "+ Add" to add menu items.
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>

    <!-- Modal: Add Menu Item (Matches Staff & Authors & MediaOS Modal Pattern 1:1) -->
    <div x-show="modalOpen"
         x-cloak
         @keydown.escape.window="modalOpen = false"
         class="fixed inset-0 z-[9990] overflow-y-auto flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" @click="modalOpen = false"></div>

        <!-- Modal Box -->
        <div class="relative bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/90 dark:border-zinc-800 max-w-lg w-full p-6 shadow-2xl z-10 transition-all">
            <!-- Header -->
            <div class="flex items-start justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
                <div>
                    <h3 class="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Add Menu Item</h3>
                    <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Enter a menu name or pick an existing category and select where it appears</p>
                </div>
                <button @click="modalOpen = false" type="button" class="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition -mr-1 -mt-1 cursor-pointer">
                    <i class="ri-close-line text-lg"></i>
                </button>
            </div>

            <!-- Unified MediaOS Form -->
            <form method="POST" action="{{ route('admin.navigation.store') }}" class="space-y-4 pt-4">
                @csrf

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                        <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Menu Name *</label>
                        <input type="text"
                               x-ref="menuLabelInput"
                               x-model="menuLabel"
                               name="label"
                               required
                               placeholder="e.g. Crime, Fact Check, Sports"
                               class="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-500">
                    </div>

                    <div>
                        <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Quick Pick Category</label>
                        <select @change="if($event.target.value) { menuLabel = $event.target.value; }"
                                class="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-500">
                            <option value="">Custom Name</option>
                            @foreach($categories as $cat)
                                <option value="{{ $cat->name }}">{{ $cat->name }}</option>
                            @endforeach
                        </select>
                    </div>
                </div>

                @if($drawerParents->isNotEmpty())
                    <div x-show="selectedLocations.includes('drawer')" x-cloak>
                        <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Side Menu Placement</label>
                        <select name="parent_id" x-model="selectedParentId"
                                class="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-500">
                            <option value="">Main Side Menu Item</option>
                            @foreach($drawerParents as $pItem)
                                @if(strtolower($pItem->label) !== 'home')
                                    <option value="{{ $pItem->id }}">Sub-menu under: {{ $pItem->label }}</option>
                                @endif
                            @endforeach
                        </select>
                    </div>
                @endif

                <div class="pt-2 border-t border-zinc-100 dark:border-zinc-800">
                    <label class="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-2.5">Display In *</label>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                        @foreach($locations as $locKey => $locMeta)
                            <label @click.prevent="toggleLoc('{{ $locKey }}')"
                                   class="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 cursor-pointer select-none">
                                <input type="checkbox"
                                       name="locations[]"
                                       value="{{ $locKey }}"
                                       :checked="selectedLocations.includes('{{ $locKey }}')"
                                       class="rounded border-zinc-300 dark:border-zinc-700 pointer-events-none">
                                <span>{{ $locMeta['label'] }}</span>
                            </label>
                        @endforeach
                    </div>
                </div>

                <div class="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-end gap-2.5">
                    <button type="button"
                            @click="modalOpen = false"
                            class="px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition cursor-pointer">
                        Cancel
                    </button>
                    <button type="submit"
                            class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-black dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 text-white text-xs font-semibold transition shadow-xs cursor-pointer active:scale-[0.98]">
                        <i class="ri-check-line text-sm"></i>
                        <span>Save Menu Item</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection
